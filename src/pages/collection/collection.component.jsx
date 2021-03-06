import React from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selector';

const CollectionPage = ({ collection  }) => {
    const {title, items} = collection;
    return (
    <div className='collection-page'>
        <div className='title'>
            <h2>{title}</h2>
        </div>
        <div className='items'>
            
            {
                items.map( item =>(
                    <CollectionItem key={item.id} item={item}></CollectionItem>
                ))
            }
        </div>
    </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    collection:selectCollection(ownProps.match.params.categoryId)(state)
})
    
    // collection: selectCollection(ownProps.params.categoryId)(state)


export default connect(mapStateToProps)(CollectionPage);