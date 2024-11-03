// App.tsx
import { SignedIn, SignedOut, SignIn, SignUp, ClerkProvider } from '@clerk/chrome-extension';
import { useNavigate, Routes, Route, MemoryRouter } from 'react-router-dom';

function HelloUser() {
  return <p>Hello user</p>;
}

const publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY || '';

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      routerPush={to => navigate(to)}
      routerReplace={to => navigate(to, { replace: true })}
    >
      <Routes>
        <Route
          path='/sign-up/*'
          element={<SignUp signInUrl='/' />}
        />
        <Route
          path='/'
          element={
            <>
              <SignedIn>
                <HelloUser />
              </SignedIn>
              <SignedOut>
                <SignIn
                  afterSignInUrl='/'
                  signUpUrl='/sign-up'
                />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

function App() {
  return (
    <MemoryRouter>
      <ClerkProviderWithRoutes />
    </MemoryRouter>
  );
}

export default App;