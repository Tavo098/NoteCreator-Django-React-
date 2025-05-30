import {useState} from 'react'
import api from "../api.js"
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants.js";
import '../styles/Form.css'

function Form({route, method, data}){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === 'login' ? 'Login' : 'Register';

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try{
            const response = await api.post(route, {username, password})
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
                navigate('/')
            } else {
                navigate('/login')
            }
        }catch(error){
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
      <form onSubmit={handleSubmit} className="form-container">
          <h1>{name}</h1>
          <input
              className="form-input"
              type="text"
              placeholder="Username"
              value={username} onChange={(e) => setUsername(e.target.value)}
          />
          <input
              className="form-input"
              type="password"
              placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className = "form-button">
              {name}
          </button>
      </form>
    );

}

export default Form