import { useState } from "react";
import  { FC, Dispatch, SetStateAction } from "react";


// interface IInputs {
//   username: string;
//   password: string;
//   // handleCreateAccount: Dispatch<SetStateAction<>>
// }

const CreateAccount = ({ handleCreateAccount }) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateAccount(inputs);
  }

  return (
    <div>

    <div>
      <form onSubmit={handleSubmit}>

        <div>
          <label className="label">
            <span className="label-text text-primary">Enter a username: </span>
          </label>
        </div>

        <div>
            <input
              required
              type="text"
              name="username"
              value={inputs.username || ''}
              placeholder="ex: Buffboi420"
              className="input bg-secondary input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
        </div>




        <div>
          <label className="label">
            <span className="label-text text-primary">Create a password: </span>
          </label>
        </div>

        <div>
            <input
              required
              type="password"
              name="password"
              value={inputs.password || ''}
              placeholder="Enter password here"
              className="input bg-secondary input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
        </div>



        <div>
          <label className="label">
            <span className="label-text text-primary">Enter your email address: </span>
          </label>
        </div>

        <div>
            <input
              required
              type="text"
              name="email"
              value={inputs.email || ''}
              placeholder="ex: buffboi420@gmail.com"
              className="input bg-secondary input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
        </div>




        <div style={{marginTop: 40, marginBottom: 40}}>
          <input type="submit" className="btn bg-neutral"/>
        </div>

      </form>
    </div>

    <div>
      <ul className="steps">
        <li className="step step-accent">Create Account</li>
        <li className="step">Personal Info</li>
        <li className="step">Login</li>
      </ul>
    </div>

    </div>
  );
}

export default CreateAccount;