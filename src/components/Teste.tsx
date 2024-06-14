
interface boxType {
    title: string
}

const Blue = (props: boxType) => {
    return(
        <div style={{width: '50px', height:'50px', backgroundColor: 'blue'}}>
            {props.title}
        </div>
    )
}

const Green = (props: boxType) => {
    return(
        <div style={{width: '50px', height:'50px', backgroundColor: 'green'}}>
            {props.title}
        </div>
    )
}

const Teste = () => {

    const list: {type: 'Blue' | 'Green'}[] = [
        {type: 'Blue'},
        {type: 'Blue'},
        {type: 'Green'}
    ]

    const componentMap: {[Key in 'Blue' | 'Green']: React.ComponentType<boxType>} = {
        Blue: Blue,
        Green: Green
    }
    
    return (
        <div>
            {list.map((item, index) => {
                const Component = componentMap[item.type];
                return <Component key={index} title={'teste'}/>
            })}
        </div>
    )
}

export default Teste;