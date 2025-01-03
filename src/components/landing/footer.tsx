import './footer.css'

export default function LandingFooter() {
  return (
    <div className="landing-footer">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',

          //   alignItems: 'center',

          gap: '1rem',
        }}
      >
        <img
          src="/mainlogo.svg"
          alt="Logo"
          width="130"
        />
        <p
          style={{
            maxWidth: '100px',
            padding: '0.5rem',
          }}
        >
          Made with ❤️ by @cuvette
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',

          //   alignItems: 'center',

          gap: '1rem',
        }}
      >
        <h2 className="bold">Product</h2>
        <ul className="footer-list">
          <li className="inlined">
            Status{' '}
            <img
              src="/redirect.svg"
              alt="redirect"
            />
          </li>
          <li className="inlined">
            Documentation{' '}
            <img
              src="/redirect.svg"
              alt="redirect"
            />
          </li>
          <li className="inlined">
            Roadmap{' '}
            <img
              src="/redirect.svg"
              alt="redirect"
            />
          </li>
          <li className="inlined">
            Pricing{' '}
            <img
              src="/redirect.svg"
              alt="redirect"
            />
          </li>
        </ul>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',

          gap: '1rem',
        }}
      >
        <h2 className="bold">Community</h2>
        <ul className="footer-list">
          <li className="inlined">
            Discord{' '}
            <img
              src="/redirect.svg"
              alt="redirect"
            />
          </li>
          <li className="inlined">
            GitHub repository{' '}
            <img
              src="/redirect.svg"
              alt="redirect"
            />
          </li>
          <li className="inlined">
            Twitter{' '}
            <img
              src="/redirect.svg"
              alt="redirect"
            />
          </li>
          <li className="inlined">
            LinkedIn{' '}
            <img
              src="/redirect.svg"
              alt="redirect"
            />
          </li>
          <li className="inlined">
            OSS Friends{' '}
            <img
              src="/redirect.svg"
              alt="redirect"
            />
          </li>
        </ul>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          //

          gap: '1rem',
        }}
      >
        <h2 className="bold">Company</h2>
        <ul className="footer-list">
          <li className="inlined">
            About{' '}
            <img
              src="/redirect.svg"
              alt="redirect"
            />
          </li>
          <li className="inlined">
            Contact{' '}
            <img
              src="/redirect.svg"
              alt="redirect"
            />
          </li>
          <li className="inlined">
            Terms of Service{' '}
            <img
              src="/redirect.svg"
              alt="redirect"
            />
          </li>
          <li className="inlined">
            Privacy Policy{' '}
            <img
              src="/redirect.svg"
              alt="redirect"
            />
          </li>
        </ul>
      </div>
    </div>
  )
}
