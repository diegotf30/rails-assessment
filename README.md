# Technical Assessment

At [Kredi](https://www.kredi.mx), We are focused on critical financial processes. That is why we want our development team to focus on quality code and best practices.

This is a small technical assessment for our open position as Sr. Backend Sofware Developer. We encourage you to follow the rules and recommendations described above:

Rules:

- Be honest, do not copy code from Stack overflow, We all know programmers do that, but this time we want to evaluate your thinking process.
- Do not mention the company name in your repository.
- Apply best practices, var names, indentation, readability, SOLID, DRY, Design patterns, etc.
- Test your code, We strongly recommend RSpec.
- Publish your code on Github || Gitlab, be careful about how you write your commit messages.
- Deploy your code to Heroku or Firebase, it takes no longer than 20 minutes!
- if you have any questions, do not hesitate to reach us, this is so important!
- Happy coding! :)

Recommendations:

- Follow best practices.
- Use code conventions for Ruby
- Use a CSS framework (Bootstrap, tailwind, or equivalent).
- Avoid n+1 queries.

## Part I

### Questions

Please add a file called `excercises.md` to your repo with your answers:



## Part II
### CHALLENGE

Your mission is to make a URL shortener full-stack application using any database engine, Ruby On Rails, (bonus points if the frontend is a SPA in ReactJS).
Create one repo if you work entirely with RoR, or two repos if you work with Rails + React. Send us the links of both repositories.

+kudos If you use docker, that would be great and give extra points.



### CORE REQUIREMENTS
- As a visitor, I want to create an account for the app, so that I become an active user.
    Acceptance Criteria:
      - Application needs my name, email, and password.
      - Duplicated emails are not allowed.
      - Validates email input.
- As an active user I must be able to put a URL into the home page and get back a URL of the shortest possible length.

      AC:
        - You shouldn't use any gem or library that provides the short url algorithm
        - Inputting a valid URL should result in displaying the new shortened URL to the user.
        - Inputting an invalid URL should result in displaying errors to the user.

- As an active user I must be able to manage my links, edit, create, destroy, etc.

- Every time one short link is opened, the app must record visitors' data, such as `IP address`, `user agent`, `OS (if possible)`, `date`.

- Our app must differentiate between unique visitors (IP's) and recurrent visitors.

- As an active user, every time I share this link, I must be redirected to the full URL when we enter the short URL (ex: [http://app.com/aSdF](http://app.com/aSdF)​ =>​ [​https://google.com​](​https://google.com​)).
- As an active user I want to see a list of my links, ordered by creation date.
- As an active user I want to click on my links to see details and stats.

      AC:
        - I want to see how many times my link was clicked.
        - I want to see a list of different devices and user agents and percentages of access.

- There must be a README that explains how to set up the application and the algorithm used for generating the URL shortcode.

- As an active user I want an API key to access and integrate any other platform with this shortener.

      AC:
        - I want an endpoint to access all my links.
        - All endpoint results must be paginated.
        - I want an endpoint to shorten new URLs.

- You need to test all your code with RSpec.


> \* Research and understand how [Bit.ly](http://bit.ly) and [TinyURL](https://tinyurl.com/) work before you decide on how to generate URLs of the shortest possible length.
There must be a view for the Top 100 most frequently accessed URLs.
