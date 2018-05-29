from flask import Blueprint
from flask import jsonify
from firebase_admin import db, credentials
import firebase_admin
import os
from app.utils import prepare_json_response


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


@mod.route('/Courses/<CourseID>/<ClassID>', methods=['GET'])
def get_specific_course(CourseID, ClassID):
    Concentration_Courses = courses.child(CourseID)
    data = Concentration_Courses.child(ClassID).get()
    return jsonify(
        prepare_json_response(
            message="OK",
            success=True,
            data=data
        )
    )


@mod.route('/Courses/<CourseID>/<ClassID>/<Attribute>', methods=['GET'])
def get_course_attribute(CourseID, ClassID, Attribute):
    Concentration_Courses = courses.child(CourseID)
    data = Concentration_Courses.child(ClassID).get()
    return jsonify(
        prepare_json_response(
            message="OK",
            success=True,
            data=data
        )
    )
