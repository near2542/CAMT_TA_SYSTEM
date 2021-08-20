import {Redirect} from 'react-router-dom'


export const Nomatch = () =>
{
    return(
        <Redirect to="/auth" />
    )
}