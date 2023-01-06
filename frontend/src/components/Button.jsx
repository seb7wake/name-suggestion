import React, { useState } from 'react'
import { generateRandomUsers } from '../services/openai'

const Button = () => {
    const [loading, setLoading] = useState(false);

    const generateUsers = async () => {
        setLoading(true)
        await generateRandomUsers().then(async () => {
            setLoading(false)
        })
        .catch(error => console.error(error));
    }

    return (
        <p className="text-gray-500 text-lg">
      <button style={{width: "29vh"}} className="pill-button" disabled={loading} onClick={() => generateUsers()}>
        {
          loading ? "Loading..." : "Generate More Users"
        }
      </button>
      </p>
    )
}

export default Button;