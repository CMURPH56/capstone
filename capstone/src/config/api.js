const API_URL = "https://csc394-capstone.tk/v1/degree"

export function getDegreeRequirements(concentration_id) {
    return fetch(`${API_URL}/Courses/${concentration_id}`)
      .then(response => response.json())
      .then(data => {
        return data['data']
    })
}

export function searchCourses(query) {
    return fetch(`${API_URL}/Courses/Search/${query}`)
      .then(response => response.json())
      .then(data => {
        if (data['data'] != null) {
            return data['data']
        }
        else {
            return {}
        }
    })
}

export function getPath(concentration_id, num_courses) {
    return fetch(`${API_URL}/FastestPath/Courses/${concentration_id}/${num_courses}`)
      .then(response => response.json())
      .then(data => {
        return data['data']
    })
}