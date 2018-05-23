import firebase_admin
from firebase_admin import db
import flask
app = flask.Flask(__name__)
firebase_admin.initialize_app(options={ 'databaseURL' : 'https://csc394-capstone.firebaseio.com'})
Courses = db.reference('Courses')


'''
Q. How many courses do you need to graduate?
A. 19 Courses. 11 Basic Courses. 4 Concentration Courses. 4 Elective Courses. 

Q. The algorithm will have the same shortest path if no classes have been taken.
A. Yes, The only time the algorithm needs to change is if classes are previously taken

Q. The algorithm for the first 11 courses for each CS concentration might be the same if the
   there are no other classes taken.
'''

@app.route('/Courses/<CourseID>')
def getConcentrationCourses(CourseID):
	Concentration_Courses = Courses.child(CourseID)
	print(Concentration_Courses.get())


@app.route('/Courses/<CourseID>/<ClassID>')
def getSpecificCourse(CourseID, ClassID):
	Concentration_Courses = Courses.child(CourseID)
	Specific_Class = Concentration_Courses.child(ClassID).get()
	print(Specific_Class)


#@app.route('/Courses/<CourseID/<ClassID>/<Attribute>')
def getCourseAttribute(CourseID, ClassID, Attribute):
	Concentration_Courses = Courses.child(CourseID)
	Specific_Class = Concentration_Courses.child(ClassID).get()
	print(Specific_Class[Attribute])

def fillPreReqs():
	foundationCoursesList = []


def getCourseAvailability(CourseID, ClassID):
	Concentration_Courses = Courses.child(CourseID)
	Specific_Class = Concentration_Courses.child(ClassID).get()
	courseOfferings = [ "Fall 2018-2019", "Spring 2017-2018", "Winter 2017-2018", "Summer II 2016-2017","Spring 2016-2017"]
	try:	
		myList = Specific_Class['Years']
		for date in myList:
			for offering in pastOfferings: 
				if date == offering:

					return true

				else:

					return false
	except KeyError:
		print("This course is not offered") 
		return false




if __name__ == '__main__':
	#getConcentrationCourses('1')
	#print("___________ This is the individual Course __________________________")
	#getSpecificCourse('1', 'CSC 457')
	#getCourseAttribute('1', 'CSC 457', 'Years')
	getCourseAvailability('1', 'CSC 458')		


