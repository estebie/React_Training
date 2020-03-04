import React from 'react';
import './shop.styles.scss';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner.styles';
import { selectIsFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';

const CollectionsOverviewwithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    componentDidMount() {
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync();
    }
    render() {
        const {match, isCollectionFetching, isCollectionLoaded} = this.props;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewwithSpinner isLoading={isCollectionFetching} {...props}/>}></Route>
                <Route path={`${match.path}/:categoryId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props}/>}/>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsFetching,
    isCollectionLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);