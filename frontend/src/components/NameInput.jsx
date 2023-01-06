import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { useEffect } from 'react'
import { search } from '../services/users'

const NameInput = () => {
    const [selectedPerson, setSelectedPerson] = useState(null)
    const [query, setQuery] = useState('')
    const [people, setPeople] = useState([])
    
    useEffect(() => {
        const searchUsers = async () => {
            console.log(query)
        if (query === '') {
            setPeople([])
            return
        }
        let result = await search(query.toLowerCase()).then((res) => {
            console.log('search result:', res)
            setPeople(res.hits.hits.map((hit) => {
                return hit._source;
            }));
            setSelectedPerson(null)
        })
        }
        searchUsers()
    }, [query])

    const getHighlightedText = () => {
        console.log(selectedPerson)
        if (selectedPerson && selectedPerson.role === "employee") {
            return "#EC7063"
        } else if (selectedPerson && selectedPerson.role === "customer") {
            return "#89CFF0"
        } else {
            return "transparent"
        }
    }

    console.log('filteredPeople: ', people)
    console.log('selectedPerson: ', selectedPerson)
    console.log('query: ', query)

    return (
        <Combobox value={selectedPerson ? selectedPerson.name : query} onChange={(val) => {setSelectedPerson(val);}}>
        <Combobox.Input style={{backgroundColor: getHighlightedText(), border:'0.5px solid black', borderRadius: '2px', width: "30%"}} onChange={(event) => setQuery(event.target.value)} />
        <Combobox.Options style={{ marginLeft: '35%', marginRight: "35%", borderRadius: '10px', }} >
            {people.map((person, i) => (
            <Combobox.Option className="border-black" style= {{backgroundColor: person.role === 'employee'? "#EC7063" : "#89CFF0", borderRadius: '2px', border:'0.5px solid black', textAlign: 'left', paddingLeft: '5%'}} key={i} value={person}>
                {person.role + ": " + person.name}
            </Combobox.Option>
            ))}
        </Combobox.Options>
        </Combobox>
    )
}

export default NameInput;