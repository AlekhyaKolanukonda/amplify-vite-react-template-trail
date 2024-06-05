/*import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'


import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
        
    <Authenticator>
      {({ signOut, user }) => (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li
          onClick={() => deleteTodo(todo.id)}
           key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
        
      )}
      </Authenticator>
  );
}

export default App;*/



import  { useState} from 'react';


import './App.css';
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

function App() {
  const [emailid, setEmailid] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

/*const handleEmailidChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
  setEmailid(event.target.value);
};

  const handleSubjectChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSubject(event.target.value);
  };

const handleBodyChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
  setBody(event.target.value);
};*/

const handleSubmit =  (e:any) => {
  e.preventDefault();
  console.log(emailid);
  console.log(subject);
  console.log(body);
 try{
  const response = fetch(' https://1ln15on441.execute-api.ap-south-1.amazonaws.com/ses/', {
      method: 'POST',
      body: JSON.stringify({
        emailid: emailid,
        subject: subject,
        body: body,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    response
        .then((response) => response.json())
        .then((data) => { 
                  
          if (data == "ok") alert("Email sent successfully");
          else alert("Mail Id not registered with SES");
          location.reload();
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
 }
 catch (error) {
  console.error('Error sending email:', error);
}
};
  return (
    <div className="App">
      <Authenticator>
          {({ signOut, }) => (
              <main>
                <header className='App-header'>
                  <title>Email Submission Form</title>
                  <div>
                      <h1>Email Submission Form</h1>
                      <p>The email will be sent only to verified identities in the SES.</p>
                      <form onSubmit={handleSubmit} >
                          <div className="form-group">
                              <label htmlFor="emailid">Email ID:</label>
                              <input type="text" id="emailid" name="emailid"  onChange={(e)=>setEmailid(e.target.value)} /><br/><br/>
                          </div>
                          
                          <div className="form-group">
                              <label htmlFor="subject">Subject:</label>
                              <input type="text" id="subject" name="subject"  onChange={(e)=>setSubject(e.target.value)} /><br/><br/>
                          </div>
                          
                          <div className="form-group">
                              <label htmlFor="body">Body:</label>
                              <textarea cols={100} rows={40}  onChange={(e)=>setBody(e.target.value)} ></textarea><br/>
                          </div>
                          
                          <button type="submit">Submit</button>
                      </form>
                  </div>
                  </header>

            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </div>
  );
}

export default App;
