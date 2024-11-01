const loadUpGuest = () => {
    // user is guest user
    const userData = {
        user_type: "guest",
        user_name: "Guest",
        user_email: "guest@projectn.com",
        user_profile_picture: "default"
    }

    localStorage.setItem('user', JSON.stringify(userData))
    window.location.replace("./home.html")
}

const loadUpSignIn = () => {
    document.getElementById('login-sign-up').setAttribute("aria-hidden", "false")
    document.getElementById('signinForm').addEventListener('submit', async function (event) {
        event.preventDefault();
    
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        try {
            const response = await fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const result = await response.json();
            if (response.ok) {
                alert('Sign-in successful');
            } else {
                alert(result.message || 'Sign-in failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during sign-in.');
        }
    });
}

const hidelogin = () => {
    document.getElementById('login-sign-up').setAttribute("aria-hidden", "true")
}
const showSignup = () => {
    document.getElementById('sign-up').setAttribute("aria-hidden", "false")
    document.getElementById('signupForm').addEventListener('submit', async function (event) {
        event.preventDefault();
    
        const userData = {
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('new_email').value,
            password: document.getElementById('new_password').value
        };
    
        try {
            const response = await fetch('/users/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while signing up.');
        }
    
    });
}

const hidesignup = () => {
    document.getElementById('sign-up').setAttribute("aria-hidden", "true")
}
