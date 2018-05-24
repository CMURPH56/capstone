const API_URL = "http://35.237.16.74/v1/degree"


export function getDegreeRequirements(concentration_id) {
    return fetch(`${API_URL}/Courses/${concentration_id}`)
      .then(response => response.json())
      .then(data => {
        return data['data']
    })
}