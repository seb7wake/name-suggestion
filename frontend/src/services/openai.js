import { bulkAddUsers } from './users';
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const generateRandomUsers = async () => {
    return new Promise (resolve => 
    fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: "Generate 4 random new realistic names and emails in plain text separated by commas.",
        max_tokens: 800,
        temperature: 0.2,

      }),
    })
      .then(response => response.json())
      .then(async data => {
        console.log(data)
        const text = data.choices[0].text.substring(4)
        const sections = text.split("\n")
        let users = []
        for (let i = 0; i < sections.length; i++) {
          let name = sections[i].split(',')[0]
          let email = sections[i].split(',')[1].substring(1)
          let role = i %2 === 0 ? "employee" : "customer"
          console.log(name, email, role)
          users.push({name: name, email: email, role: role})
        }
        await bulkAddUsers(users)
        resolve(users)
      }))
}

export { generateRandomUsers };