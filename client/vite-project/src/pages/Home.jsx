function Home() {
  return (
    //when the user is logged in(how? -> if the tokens exits in the cookies) then we can show the user the home page, else we can redirect the user to login page
    //right now with just the routes setup, the user can access the home page without logging in, we will fix this.
    //each page must have a check for the token in the cookies, if it exists then we can show the page, else we can redirect the user to login page
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

export default Home
