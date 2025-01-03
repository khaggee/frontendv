import LandingFooter from '@/components/landing/footer'
import LandingHeader from '@/components/landing/layout-header'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'var(--background2)',
      }}
    >
      <LandingHeader />
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          width: '100%',
        }}
      >
        <section
          style={{
            display: 'flex',
            position: 'relative',
            height: '60vh',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px 100px',

            // outline: '1px solid red',
          }}
        >
          <img
            src="/main1.svg"
            alt="main1"
            style={{
              position: 'absolute',
              top: '20%',
              left: 0,
            }}
          />
          <img
            src="/main2.svg"
            alt="main2"
            style={{
              position: 'absolute',
              top: '20%',
              right: 0,
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '60%',
            }}
          >
            <h1
              style={{
                fontSize: '4rem',
                fontWeight: 'bold',
                textAlign: 'center',
                background:
                  'linear-gradient(90deg, #4B83FF 0%, #7C8BFA 46%, #B794F4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Build advanced chatbots visually
            </h1>
            <p
              style={{
                fontSize: '1.25rem',
                textAlign: 'center',
                maxWidth: '80%',
              }}
            >
              Typebot gives you powerful blocks to create unique chat
              experiences. Embed them anywhere on your web/mobile apps and start
              collecting results like magic.
            </p>
            <Button
              style={{
                marginTop: '1rem',
                height: '3rem',
                borderRadius: '0.25rem',
                padding: '0 1.75rem',
              }}
            >
              Create a FormBot for free
            </Button>
          </div>
        </section>

        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px 150px',
            position: 'relative',
            // outline: '1px solid red',
          }}
        >
          <img
            src="/mainImage.svg"
            alt="mainImage"
            style={{ width: '100%' }}
          />
          <img
            src="/main3.svg"
            alt="main3"
            style={{
              width: '95%',
              position: 'absolute',
              bottom: 0,
              zIndex: -1,
            }}
          />
        </section>
        <LandingFooter />
      </main>
    </div>
  )
}
