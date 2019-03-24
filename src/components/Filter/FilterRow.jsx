import React from 'react';

import NameFilter from '../Filter/NameFilter/NameFilter';
import NumberFilter from './NumberFilter/NumberFilter';
import DisplayTypeFilter from '../Filter/DisplayTypeFilter/DisplayTypeFilter';
import OutputsFilter from '../Filter/OutputsFilter/OutputsFilter';

const filterRow = () => (
    <div >
        <NameFilter />
        <span>-</span>
        <NumberFilter /> {/* display size filter */}
        <DisplayTypeFilter />
        <OutputsFilter />
        <NumberFilter /> {/* resolution filter */}
    </div>
);

export default filterRow;
