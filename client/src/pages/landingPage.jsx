const Subscription = () => {
  const subs = [
    {
      name: "Basic Plan",
      price: "₹10,000",
      description: "Ideal for single small project with essential integrations and basic support.",
      features: [
        "One project",
        "One database server integration",
        "One external API service integration",
        "Basic support"
      ],
      buttonText: "Get Started"
    },
    {
      name: "Standard Plan",
      price: "₹1,00,0000",
      description: "Perfect for growing businesses with multiple projects and priority support.",
      features: [
        "Up to five projects",
        "Two database server integrations",
        "Three external API service integrations",
        "Priority support",
        "Access to standard features"
      ],
      buttonText: "Get Started"
    },
    {
      name: "Premium Plan",
      price: "₹25,00,000",
      description: "Comprehensive solution for unlimited projects and premium features with dedicated support.",
      features: [
        "Unlimited projects",
        "Unlimited database server integrations",
        "Unlimited external API service integrations",
        "Access to all premium features",
        "Available physically 8 hours per day"
      ],
      buttonText: "Get Started"
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Purchase processing...");

    // send plan detials along with user info to backend
  };

  return (
    <div className="subs-container">
      {subs.map((sub, index) => (
        <div key={index} className="sub-card">
          <h2>{sub.name}</h2>
          <h3>{sub.price}</h3>
          <p>{sub.description}</p>
          <button onClick={handleSubmit}>{sub.buttonText}</button>
          <ul>
            {sub.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Subscription;
