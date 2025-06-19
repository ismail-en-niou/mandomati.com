"use client";

import { useState } from 'react';
import { Stepper, Step } from '../components/Stepper';

export default function Form() {
  const [name, setName] = useState("");

  return (
    <Stepper
      initialStep={1}
      onStepChange={(step) => {
          console.log(step);
      }}
      onFinalStepCompleted={() => console.log("All steps completed!")}
      backButtonText="Previous"
      nextButtonText="Next"
    >
      <Step>
          <h2 className="text-white text-2xl font-bold mb-4">Welcome to the React Bits stepper!</h2>
          <p className="text-gray-300">Check out the next step!</p>
      </Step>
      <Step>
          <h2 className="text-white text-2xl font-bold mb-4">Step 2</h2>
          <img 
            style={{ 
              height: '100px', 
              width: '100%', 
              objectFit: 'cover', 
              objectPosition: 'center -70px', 
              borderRadius: '15px', 
              marginTop: '1em' 
            }} 
            src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894" 
            alt="Cat illustration"
          />
          <p className="text-gray-300 mt-4">Custom step content!</p>
      </Step>
      <Step>
          <h2 className="text-white text-2xl font-bold mb-4">How about an input?</h2>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Your name?" 
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-500"
          />
      </Step>
      <Step>
          <h2 className="text-white text-2xl font-bold mb-4">Final Step</h2>
          <p className="text-gray-300">You made it!</p>
          {name && <p className="text-green-400 mt-2">Hello, {name}!</p>}
      </Step>
    </Stepper>
  );
}