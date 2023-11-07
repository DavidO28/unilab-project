import FilterIcon from '../../assets/images/FormPage/filterIcon.png';
import './FilterComponent.css';

function FilterComponent({ filters, isFilterOpen, toggleFilterPopUp, handleFilterChange }) {

    return (
        <div>
            <span onClick={toggleFilterPopUp}>
                <img src={FilterIcon} alt="FilterIcon" />
                Filter
            </span>
            {isFilterOpen && (
                <div className="filterPopUp open">
                    <div>
                        <h4>სტატუსი</h4>
                        {
                            <div>
                                <label>
                                    Active
                                </label>

                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={filters.active}
                                    onChange={handleFilterChange}
                                />
                                <br />
                                <label>
                                    Inactive
                                </label>

                                <input
                                    type="checkbox"
                                    name="inactive"
                                    checked={filters.inactive}
                                    onChange={handleFilterChange}
                                />
                            </div>
                        }
                    </div>
                    <div>
                        <h4>სქესი</h4>
                        {
                            <div>
                                <label>
                                    Male
                                </label>
                                <input
                                    type="checkbox"
                                    name="male"
                                    checked={filters.male}
                                    onChange={handleFilterChange}
                                />
                                <br />
                                <label>
                                    Female
                                </label>
                                <input
                                    type="checkbox"
                                    name="female"
                                    checked={filters.female}
                                    onChange={handleFilterChange}
                                />
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default FilterComponent;
