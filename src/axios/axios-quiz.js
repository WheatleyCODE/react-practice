import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-667ca.firebaseio.com/'
})