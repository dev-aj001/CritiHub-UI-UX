<script>
  let email = '';
  let password = '';
</script>

<style>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
    background-color: #fff;
  }

  .login-container h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .login-container p {
    color: #666;
    margin-bottom: 1.5rem;
  }

  .input-field {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }

  .social-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .social-button {
    width: 30%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .social-button img {
    max-width: 100%;
    height: auto;
  }

  .login-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .login-button:hover {
    background-color: #0056b3;
  }
</style>

<div class="login-container">
  <h1>Back to your digital life</h1>
  <p>Choose one of the option to go</p>
  <input type="email" placeholder="Email" class="input-field" bind:value={email} />
  <input type="password" placeholder="Password" class="input-field" bind:value={password} />
  
  <p>Or continue with</p>
  
  <div class="social-buttons">
    <div class="social-button"></div>
    <div class="social-button"></div>
    <div class="social-button"></div>
  </div>
  
  <button class="login-button">Log in</button>
</div>
