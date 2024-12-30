const Subscription = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$9.99/month',
      features: 'Access to basic features, Ad-supported',
      buttonText: 'Subscribe Now',
    },
    {
      name: 'Pro',
      price: '$19.99/month',
      features: 'Access to all features, Ad-free, Priority Support',
      buttonText: 'Subscribe Now',
    },
    {
      name: 'Enterprise',
      price: 'Custom Pricing',
      features: 'Custom solutions, Dedicated Support, Advanced Features',
      buttonText: 'Contact Us',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{ backgroundColor: '#6200ea', color: 'white', padding: '50px 20px', textAlign: 'center' }}>
      </section>

      {/* Pricing Section */}
      <section style={{ display: 'flex', justifyContent: 'space-around', padding: '50px 20px', backgroundColor: 'white' }}>
        {plans.map((plan, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#f4f4f9',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              width: '30%',
            }}
          >
            <h2 style={{ fontSize: '1.5em', marginBottom: '10px' }}>{plan.name}</h2>
            <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#6200ea', marginBottom: '10px' }}>{plan.price}</p>
            <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>{plan.features}</p>
            <button
              style={{
                backgroundColor: '#ff4081',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1em',
                cursor: 'pointer',
              }}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Subscription;