import firebase_admin
from firebase_admin import db
import flask
app = flask.Flask(__name__)
firebase_admin.initialize_app(options={ 'databaseURL' : 'https://csc394-capstone.firebaseio.com'})
Courses = db.reference('Courses')


'''
Q. How many courses do you need to graduate?
A. 19 Courses. 11 Basic Courses. 4 Concentration Courses. 4 Elective Courses. 
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


@app.route('/Courses/<CourseID/<ClassID>/<Attribute>')
def getCourseAttribute(CourseID, ClassID, Attribute):
	Concentration_Courses = Courses.child(CourseID)
	Specific_Class = Concentration_Courses.child(ClassID).get()
	print(Specific_Class[Attribute])





if __name__ == '__main__':
	#getConcentrationCourses('1')
	#print("___________ This is the individual Course __________________________")
	#getSpecificCourse('1', 'CSC 457')
	getCourseAttribute('1', 'CSC 457', 'CourseName')



