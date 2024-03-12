import { fetchAutocompleteSuggestions } from '../services/api'
import { useQuery } from 'react-query'
import { options } from './options'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { KeyboardEvent, Fragment, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Operands } from './Inp'

const AutocompleteComponents = () => {

    let inputElement: any = useRef()
    const [inputData, setInputData] = useState<string[]>([])

    const { data, error, isLoading } = useQuery('autoComplete', fetchAutocompleteSuggestions)

    if (error) return <div>Request Failed</div>
    if (isLoading) return <div>Loading...</div>

    const option = options(data)

    const handleInputChange = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            const target = e.target as HTMLInputElement
            const selectedOption = target.value
            setInputData([...inputData, selectedOption])

            if (inputElement && inputElement.current) {
                inputElement.current.value = ""
            }
        }
    }

    const onDelete = (value: string) => {
        const filtered = inputData.filter((values) => values !== value)
        setInputData(filtered)
    }

    return (
        <Fragment>
            <div className='parent'>
                {inputData.map((i: string, index: number) => (
                    <div key={index} className={Operands.includes(i) ? 'operands' : 'element'}>
                        {i}
                        {!Operands.includes(i) && <CloseIcon onClick={() => onDelete(i)} />}
                    </div>
                ))}
                <Autocomplete
                    disablePortal
                    options={option}
                    getOptionLabel={(option) => option.label}
                    sx={{ width: 200 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="AutoComplete"
                            onKeyDown={handleInputChange}
                            inputRef={inputElement}
                        />
                    )}
                />
            </div>
        </Fragment>
    )
}

export default AutocompleteComponents