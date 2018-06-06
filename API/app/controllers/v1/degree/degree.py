from flask import Blueprint
from flask import jsonify
from firebase_admin import db, credentials
import firebase_admin
import os
from app.utils import prepare_json_response

###############################################################

import re

token_map = {
  "^\($": "lparen",
  "^\)$": "rparen",
  "^and$": "and",
  "^or$": "or",
  "^[A-Z]{2}[A-Z]?\s*[0-9]{3}$": "course"
}


class Lexer:
    class Token:
        def __init__(self, string, sym):
            self.string, self.sym = string, sym

        def __str__(self):
            return "(str=\"{a}\", sym={b})".format(a=self.string, b=self.sym)

    def __init__(self, string):
        self.tokens, self.index = [], 0

        # do some pre-processing
        string = string.replace("AND", "and")
        string = string.replace("OR", "or")

        # ignore whitespace in this lang
        string = string.replace(" ", "")
        temp = ""
        matches = False

        for str_index in range(0, len(string)):
            matches = False
            temp += string[str_index]

        for key in token_map.keys():
            if re.match(key, temp):
                self.tokens.append(self.Token(temp, token_map[key]))
                matches = True
                temp = ""

        self.tokens.append(self.Token("EOI", "eoi"))

        if not matches:
            raise "Encountered error while tokenizing. \"{a}\" does not fit into the expected language.\n".format(a=temp)

    def advance(self):
        self.index += 1

    def peek(self):
        if self.index < len(self.tokens):
            return self.tokens[self.index]

    def previous(self):
        if self.index > 0:
            return self.tokens[self.index-1]


class AndNode:
    def __init__(self):
        self.left, self.right = None, None

    def __str__(self):
        return "[AND, {a}, {b}]".format(a=self.left, b=self.right)


class OrNode:
    def __init__(self):
        self.children = []

    def __str__(self):
        return "[OR, {a}]".format(a=(", ".join([str(i) for i in self.children])))


def parse_error(lexer):
    raise "Error on the following token: \"{a}\"".format(a=lexer.peek())


def accept(lexer, sym):
    if lexer.peek().sym != sym:
        return False

    #print("{a}".format(a=lexer.peek()))
    lexer.advance()
    return True


def expect(lexer, sym):
    if not accept(lexer, sym):
        parse_error(lexer)

    return True


def evaluate(string):
    if len(string) == 0 or string == "NONE" or string == "None":
        return "NONE"

    lexer = Lexer(string)
    val = None
    try:
        if accept(lexer, "course"):
            val = lexer.previous().string
            expect(lexer, "eoi")
    except Exception:
        lexer = Lexer("("+string+")")
        val = EXPR_eval(lexer)
        expect(lexer, "eoi")
        return val


def EXPR_eval(lexer):
    """
    Returns an and-or tree based on the parsed string
    if it is in a valid form.

    Note:
    List-based recursion can be used to evaluate
    the and-or trees. Preorder makes it easier to parse.
    TODO: ensure the node strings are in proper JSON format?
    """
    if accept(lexer, "course"):
        return lexer.previous().string

    node = None
    expect(lexer, "lparen")
    val = EXPR_eval(lexer)

    if accept(lexer, "and"):
        node = AndNode()
        node.left = val
        node.right = EXPR_eval(lexer)
    elif accept(lexer, "or"):
        node = OrNode()
        node.children.append(val)
        node.children.append(EXPR_eval(lexer))
    if accept(lexer, "or"):
        node.children.append(EXPR_eval(lexer))
    else:
        parse_error(lexer)

    expect(lexer, "rparen")

    return node


def parse(string):
    return evaluate(string)

###############################################################


path = os.path.join(os.getcwd(), 'app/controllers/v1/degree/csc394-creds.json')

cred = credentials.Certificate(path)
firebase_admin.initialize_app(cred, options={'databaseURL': 'https://csc394-capstone.firebaseio.com'})


mod = Blueprint("v1_degree", __name__, url_prefix="/v1/degree")

courses = db.reference('Courses')


@mod.route('/Courses/<CourseID>', methods=['GET'])
def get_concentration_courses(CourseID):
    concentration_courses = courses.child(CourseID)
    data = concentration_courses.get()

    return jsonify(
        prepare_json_response(
            message="OK",
            success=True,
            data=data
        )
    )


def eval_tree(course, tree, lis, reqs):
    if tree is None or tree == "NONE":
        return True

    if type(tree) is str:
        # WIP
        if tree not in [course.replace(" ", "") for course in reqs]:
            # the course may not be in our DB, an error, but still:
            return True
        if tree in [course.replace(" ", "") for course in lis]:
            print (course, "is in", lis)
            return True

    elif type(tree) is OrNode:
        for child in OrNode.children:
            if not eval_tree(child, lis):
                return False
    elif type(tree) is AndNode:
        return eval_tree(tree.left, lis) and eval_tree(tree.right, lis)

    return True


@mod.route('/FastestPath/Courses/<CourseID>/<num_courses>', methods=['GET'])
def get_fastpath_list(CourseID, num_courses):
    concentration_courses = courses.child(CourseID)
    data = concentration_courses.get()

    lis = []
    reqs = sorted(data.keys())

    print("reqs are:", reqs)

    while len(reqs) > len(lis):
        for course in reqs:  # Note: course has whitespace
            if course not in lis:
                try:
                    # WIP, preprocessing
                    prereq_str = data[course]["Prereq"]
                    prereq_str = prereq_str.replace(":", "").replace(".", "")
                    prereq_str = prereq_str.replace("PREREQUISITE(S)", "")
                    prereq_str = prereq_str.replace("Prerequisite(s)", "")
                    prereq_str = prereq_str.replace("or consent of instructor", "").strip()

                    # perform parse step
                    tree = parse(prereq_str)

                    # no parse error occurred, so string is in lang, so
                    if eval_tree(course, tree, lis, reqs):
                        print("success for", course, prereq_str, lis)
                        lis.append(course)
                except Exception:
                    # print("Adding, but error on", course, prereq_str, lis, reqs)
                    lis.append(course)
    lis = [{course: courses.child(CourseID).child(course).get()} for course in lis]
    num_courses_int = int(num_courses)
    split_path = [lis[i:i+num_courses_int] for i in range(0,len(lis),num_courses_int)]
    print split_path
    return jsonify(
        prepare_json_response(
            message="OK",
            success=True,
            data=split_path
        )
    )

@mod.route('/Courses/Search/<query>', methods=['GET'])
def search_courses(query):
    query = query.strip()
    data = {}
    for idx, category in enumerate(courses.get()):
        for course in category.keys():
            if query in course and data.get(course) is None:
                course_data = courses.child(str(idx)).child(course).get()
                data[course] = course_data

    return jsonify(
        prepare_json_response(
            message="OK",
            success=True,
            data=data
        )
    )