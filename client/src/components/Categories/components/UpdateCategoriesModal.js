import React, { Fragment } from 'react';
import Input from '../../../components/UI/Input/Input';
import Modal from '../../../components/UI/Modal/Modal';
import { Row, Col } from 'react-bootstrap';


const UpdateCategoriesModal = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        size,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList,
        onSubmit
    } = props;

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
            size={size}
        >
            {
                (expandedArray.length > 0) ?
                    <Fragment>
                        <Row>
                            <Col>
                                <h6>Categorias Expandidas</h6>
                            </Col>
                        </Row>
                        {expandedArray.map((item, index) =>
                            <Row key={index}>
                                <Col>
                                    <Input
                                        value={item.name}
                                        placeholder={`Category Name`}
                                        onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                    />
                                </Col>
                                <Col>
                                    <select
                                        className="form-control"
                                        value={item.parentId}
                                        onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                        <option>Categoria Padre</option>
                                        {categoryList ?
                                            categoryList.map(option =>
                                                <option key={option.value} value={option.value}>{option.name}</option>
                                            )
                                            : null
                                        }
                                    </select>
                                </Col>
                            </Row>
                        )}
                    </Fragment>
                    :
                    null
            }
            {(!checkedArray.length && !expandedArray.length) ?
                <Row>
                    <Col>
                        <h6>Nada por aqui, selecciona alguna Categoria para continuar.</h6>
                    </Col>
                </Row>
                : null
            }
            {
                (checkedArray.length > 0) ?
                    <Fragment>
                        <Row>
                            <Col>
                                <h6>Categorias Seleccionadas</h6>
                            </Col>
                        </Row>
                        {checkedArray.map((item, index) =>
                            <Row key={index}>
                                <Col>
                                    <Input
                                        value={item.name}
                                        placeholder={`Category Name`}
                                        onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                    />
                                </Col>
                                <Col>
                                    <select
                                        className="form-control"
                                        value={item.parentId}
                                        onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                        <option>Categoria Padre</option>
                                        {
                                            categoryList.map(option =>
                                                <option key={option.value} value={option.value}>{option.name}</option>
                                            )
                                        }
                                    </select>
                                </Col>
                            </Row>
                        )}
                    </Fragment>
                    :
                    null
            }
        </Modal>
    );
}

export default UpdateCategoriesModal;