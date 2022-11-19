import { useState } from "react";
import logo from "./assets/logo.svg";
import logout from './assets/logout.svg'
import { login } from "./api";
import loginSvg from './assets/login.svg'
import { useForm } from "react-hook-form";
import { IUser, User, Inputs } from "./types";
import loader from './assets/loader.svg'

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }} = useForm<Inputs>();

  const handleLogin = async (user: User) : Promise<void> => {
    const response = await login(user);
    if(response.error) {
      setError(response.error);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setUser(response.data);
      }, 1000);
    }
  };

  const handleLogout = () : void => {
    setUser(null);
  };

  return user ? (
    <div className='body'>
      <div className="logo_container">
        <img src={logo} alt="logo" className='logo' />
      </div>
      <div className="profile_container">
        <div className="profile_window">
          <img src={user.avatar} alt="avatar" className='avatar' />
          {
            user && (
              <h1>That's it, {user.name}!</h1>
            )
          }
          <button className='logout_btn' onClick={handleLogout}>
            <img src={logout} alt="logout" className='logout_img' />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className='body'>
      <div className='logo_container'>
        <img src={logo} alt="logo" className='logo' />
      </div>
      <div className='login_container'>
        <div className='login_window'>
          <div className='login_text'>
            <h1>
              Welcome, stranger!
            </h1>
            <p>Please log in to this form if you wish to pass the exam</p>
          </div>

          <form className='form' onSubmit={handleSubmit(handleLogin)}>
            <input type="email" placeholder='Email' {...register("email", { pattern: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi })} className="input_form" />
            {errors.email && <span role="alert" className='error-text'>Enter a valid email</span>}
            
            <input type="password" placeholder='Password' {...register('password', { required: true })} className="input_form"/>
            {errors.password && <span role="alert" className='error-text'>Enter a valid password</span>}

            <div className="login_btn">
              {
                loading ? ( 
                  <button type="submit" className="loading_btn">
                    <img src={loader} alt='loader' className='loader'  />
                  </button>
                ) : (
                  <button type="submit">
                    <span>Login</span>
                    <img src={loginSvg}
                      alt="login"
                      className='login_img'
                    />
                  </button>
                )
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;
