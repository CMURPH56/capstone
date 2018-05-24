const API_URL = "https://csc394-capstone.tk/v1/degree"


export function getDegreeRequirements(concentration_id) {
    return fetch(`${API_URL}/Courses/${concentration_id}`)
      .then(response => response.json())
      .then(data => {
        return data['data']
    })
}