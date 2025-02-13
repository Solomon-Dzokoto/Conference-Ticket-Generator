export const getDetails = () => {

    const ticketSelection = localStorage.getItem("ticketSelection");
    const personInfo = localStorage.getItem("personInfo");
    if (ticketSelection && personInfo) {
        const ticketData = JSON.parse(ticketSelection)
        const personInfoData = JSON.parse(personInfo)
        console.log(ticketData)
        console.log(personInfoData)
        return [ticketData, personInfoData]
    } else {
        console.log("No user details")
    }
    return null
}