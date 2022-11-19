import { useEffect, useState } from "react";
import logo from "./assets/logo.svg";
import logout from './assets/logout.svg'
import { login } from "./api";
import loginSvg from './assets/login.svg'
import { useForm } from "react-hook-form";
import { IUser, User, Inputs } from "./types";
import loader from './assets/loader.svg'

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [borderInput, setBorderInput] = useState("rgba(238, 238, 238, 0.8)");
  const [text, setText] = useState("");
  const { register, handleSubmit, formState: { errors }, watch } = useForm<Inputs>(); 

  const handleLogin = async (user: User) => { 
    const response = await login(user);

    if(response.error) {
      setError(response.error);
      setBorderInput("red");
      setText("Invalid email or password");
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setUser(response.data);
        setError(null);
        setBorderInput("rgba(238, 238, 238, 0.8)");
        setText("");
      }, 1000);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    let email = watch("email");
    let password = watch("password");

    if(email === "" || password === "") {
      setBorderInput("rgba(238, 238, 238, 0.8)");
      setText("");
    }
  }, [watch]);

  //change border color input on every change input
  const handleInput = () => {
    setBorderInput("rgba(238, 238, 238, 0.8)");
    setText("");
  };

  console.log(errors);

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

          <input type="email" placeholder='Email' {...register('email', { pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })} style={{ borderColor: borderInput}} onChange={handleInput}/>
          <span className="error-text">{text}</span>
          {errors.email && <span className="error-text">Invalid email</span>}

          <input type="password" placeholder='Password' {...register('password')} style={{ borderColor: borderInput}} onChange={handleInput}/>
          <span className="error-text">{text}</span>
          { errors.password && <span className="error-text">{error}</span> }

            <div className="login_btn">
              {
                loading ? ( 
                  <button className="pressed" disabled={loading ? true : false}>
                    <img src={loader} alt='loader' className='loader'/>
                  </button>
                  
                ) : (
                <button type="submit" disabled={errors.email || errors.password ? true : false}>
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
