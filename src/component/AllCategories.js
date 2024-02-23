import Filter from './Filter';

const AllCategories = () => {
    return(
        <div className="all-categories">
            {['all', 'vegetables', 'fruits', 'berries'].map((category, index) => 
            <Filter key={index} category={category}/>
            )}
        </div>
    )
}

export default AllCategories;