import React, { useEffect, useState, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, connect, useSelector } from 'react-redux';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import * as actions from '../../actions';

import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import AddCategoryModal from './components/AddCategoryModal';
import Modal from '../../components/UI/Modal/Modal';

import './Categories.css';

const Categories = (props) => {
    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!category.loading) setShow(false);
    }, [category.loading]);


    const handleClose = () => {

        const data = {};

        if (categoryName === "") {
            alert('Category name is required');
            setShow(false);
            return;
        }

        data['name'] = categoryName;
        data['parentId'] = parentCategoryId;

        props.addCategory(data);
        setCategoryName('');
        setParentCategoryId('');
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        const myCategories = [];
        categories.map((item, index) => {
            myCategories.push({
                label: item.name,
                value: item._id,
                children: item.children.length > 0 && renderCategories(item.children)
            });
        });
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        categories.map((item, index) => {
            options.push({
                value: item._id,
                name: item.name,
                parentId: item.parentId
            });
            if (item.children.length > 0) {
                createCategoryList(item.children, options)
            }
        });
        return options;
    }

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index === _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index === _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
        });
        dispatch(props.updateCategories(form));
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));

        if (checkedIdsArray.length > 0) {
            dispatch(props.deleteCategoriesAction(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(props.getAllCategories())
                        setDeleteCategoryModal(false)
                    }
                });
        }

        setDeleteCategoryModal(false);

    }

    const renderDeleteCategoryModal = () => {
        return (
            <Modal
                modalTitle="Confirm"
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            alert('no');
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
            >
                <h5>Expanded</h5>
                { expandedArray.map((item, index) => <span key={index}>{item.name}</span>)}
                <h5>Checked</h5>
                { checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}

            </Modal>
        );
    }

    const categoryList = createCategoryList(category.categories);

    return (
        <Fragment>
            <Container>
                <Row>
                    <Col>
                        <h2 className="our-product">Categorias</h2>
                    </Col>
                </Row>
                <hr/>
                <br/>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <i className={`fa fa-check-square`}></i>,
                                uncheck: <i className={`far fa-square`}></i>,
                                halfCheck: <i className={`fal fa-check-square`}></i>,
                                expandClose: <i className={`fas fa-caret-down`}></i>,
                                expandOpen: <i className={`fas fa-caret-up`}></i>,
                            }}
                        />
                    </Col>
                </Row>
                <hr/>
                <br/>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className="actionBtnContainer">
                                <a onClick={handleShow}><i className={`fa fa-plus-square`}></i> Añadir</a>
                                <a onClick={deleteCategory}><i className={`fa fa-minus-square`}></i> Borrar</a>
                                <a onClick={updateCategory}><i className={`fa fa-edit`}></i> Editar</a>
                            </div>

                        </div>

                    </Col>
                </Row>
            </Container>
            <AddCategoryModal
                show={show}
                handleClose={() => setShow(false)}
                onSubmit={handleClose}
                modalTitle={'Añadir Nueva Categoria'}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryList={categoryList}
            />
            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                onSubmit={updateCategoriesForm}
                modalTitle={'Editar Categorias'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />
            {renderDeleteCategoryModal()}
        </Fragment>
    )

}

function mapStateToProps(state) {
    return {
        errorMessage: state.prods.errorMessage,
        category: state.category
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'Categories' })
)(Categories)