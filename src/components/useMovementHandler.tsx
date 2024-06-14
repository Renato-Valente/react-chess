interface prospType {
    setPawns: (e: React.SetStateAction<{x: number, y: number}[]>) => any;
    pawnIndex: number;
    xOffset: number | undefined;
    yOffset: number | undefined;
    containerSize: {width: number, height: number};
    size: {width: number, height: number};
    column: React.MutableRefObject<number>;
    row: React.MutableRefObject<number>;
    pageX: React.MutableRefObject<number>;
    pageY: React.MutableRefObject<number>;
}

const useMovementHandler = (props: prospType) => {

    const {setPawns, pawnIndex, xOffset, yOffset, containerSize, size, column, row, pageX, pageY} = props;
    const boxSize = {width: containerSize.width / 8, height: containerSize.height / 8}

    const touchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        e.currentTarget.style.position = 'absolute';
        const container_x = column.current * boxSize.width + boxSize.width / 2;
        const container_y = row.current * boxSize.height + boxSize.height / 2;
        //e.currentTarget.style.position = 'static';
        if(!xOffset || !yOffset) return;
        e.currentTarget.style.left = `${container_x + xOffset - size.width / 2}px`;
        e.currentTarget.style.top = `${container_y + yOffset - size.height / 2}px`;

        setPawns((prev) => {
            let result = [...prev];
            result[pawnIndex] = {x: column.current, y: row.current};
            return result;
        })
    }

    const touchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        
        if(!xOffset || !yOffset) return;

        const newPageX = e.touches[0].pageX;
        const newPageY = e.touches[0].pageY;

        pageX.current = ((newPageX - xOffset) > 0 && (newPageX) < (containerSize.width + xOffset)) ? 
        newPageX : pageX.current;
        pageY.current = ((newPageY - yOffset) > 0 && newPageY < (containerSize.height + yOffset)) ? 
        newPageY : pageY.current; 
        
        const containerX = pageX.current - xOffset;
        const containerY = pageY.current - yOffset;
        //console.log('moving: ', containerX);
        column.current = (Math.floor(containerX / boxSize.width));
        row.current = (Math.floor(containerY / boxSize.height));
        
        e.currentTarget.style.left = `${pageX.current}px`;
        e.currentTarget.style.top = `${pageY.current}px`;
    }

    return {touchMove ,touchEnd}

}


export default useMovementHandler;