export interface suggestedData {
    name:     string;
    category: string;
    value:    number | string;
    id:       string;
}
export const options = (data: suggestedData[]) => {
    if(data){
        return data.map(({ name, value }) => {
            return {
                id: value,
                label: name
            };
        })
    }
    return []
}