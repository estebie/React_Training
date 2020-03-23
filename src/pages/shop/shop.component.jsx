import React, {useEffect} from 'react';
import './shop.styles.scss';

import { Route } from 'react-router-dom';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { connect } from 'react-redux';
import { CollectionsOverviewContainer } from '../../components/collections-overview/collections-overview.container';
import { CollectionsPageContainer } from '../collection/collection.container';



const ShopPage = ({match, fetchCollectionsStart}) => {
    useEffect(()=>{
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);

    return (
        <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionsOverviewContainer}/>
            <Route path={`${match.path}/:categoryId`} component={CollectionsPageContainer}/>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);