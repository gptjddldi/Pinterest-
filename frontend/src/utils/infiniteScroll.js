import React, {useState} from 'react'
import {List, AutoSizer, CellMeasurer, CellMeasurerCache, InfiniteLoader} from 'react-virtualized'
import Masonry from "react-masonry-css";
import PinCard from "../components/PinCard";

export default function InfiniteScroll({fetchFeed}) {
    const [postList, setPostList] = useState([])

    let cellMeasurerCache = new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100
    });

    const rowRenderer = ({ index, parent, key, style }) => {
        return (
            <CellMeasurer
                key={key}
                cache={this.cellMeasurerCache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}
            >
                <Masonry
                    breakpointCols={{default: 5, 1280: 4, 1024: 3, 768: 2, 640: 1}}
                    className="container mx-auto flex"
                    columnClassName="mx-2"
                >
                    {postList.map((pin, index) =>
                        <PinCard className="my-10" pin={pin} key={index}/>
                    )}
                </Masonry>
            </CellMeasurer>
        );
    };

    const isRowLoaded = ({ index }) => {
        return !!this.listData[index];
    };

    return (
        <div className="InfinteList">
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.fetchFeed}
                rowCount={10000000}
                ref={ref => (this.infiniteLoaderRef = ref)}
            >
                {({ onRowsRendered, registerChild }) => (
                    <AutoSizer>
                        {({ width, height }) => (
                            <List
                                rowCount={this.listData.length}
                                width={width}
                                height={height}
                                rowHeight={this.cellMeasurerCache.rowHeight}
                                rowRenderer={this.rowRenderer}
                                deferredMeasurementCache={this.cellMeasurerCache}
                                overscanRowCount={2}
                                onRowsRendered={onRowsRendered}
                                ref={el => {
                                    this.listRef = el;
                                    registerChild(el);
                                }}
                            />
                        )}
                    </AutoSizer>
                )}
            </InfiniteLoader>
        </div>
    );
}