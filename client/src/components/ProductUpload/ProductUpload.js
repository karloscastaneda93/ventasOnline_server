import React, { Component, Fragment } from "react";
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as actions from '../../actions';
import TagsInput from 'react-tagsinput';
import { Alert, Button } from 'react-bootstrap';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import { renderCategories, getCheckedCategory } from "../../utils/common";

import "./ProductUpload.css";
import CustomInput from '../CustomInput/CustomInput';
import TopBanner from '../TopBanner/TopBanner';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';

const ProductSchema = Yup.object().shape({
    title: Yup.string().required("Debes asignar Titulo del Producto"),
    price: Yup.string().required("Debes asignar Precio del Producto")
});

class ProductUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            images: [],
            checked: [],
            expanded: [],
            showSelectCategoryModal: false,
            selectedImage: "https://via.placeholder.com/420x360/EAEAEA/808080?text=Seleccionar+Imagen+Del+Producto",
            selectedImageName: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    async onSubmit(data) {
        const { tags, images, checked } = this.state;

        let formData = new FormData();

        if (images && images.length) {
            images.forEach((image, i) => {
                formData.append("images", image);
            });
        }

        if (tags && tags.length) {
            tags.forEach((tag, i) => {
                formData.append("tags", tag);
            });
        }

        if (checked && checked.length) {
            checked.forEach((item, i) => {
                formData.append("category", item);
            });
        }

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                formData.append(key, element);
            }
        }

        await this.props.uploadProduct(formData);

        this.clearState();
    }

    clearState() {
        this.setState({
            tags: [],
            images: []
        });
    }


    componentDidMount() {
        this.props.getAllCategories();
    }

    handleTagsChange(tags) {
        this.setState({ tags });
    }

    handleFileSelect(e) {
        e.preventDefault();
        let { images } = this.state;
        this.setState({ selectedImage: "" });
        this.setState({ selectedImageName: "" });
        const files = Array.from(e.target.files);

        const reader = new FileReader();
        const _this = this;
        reader.onload = function (e) {
            _this.setState({ selectedImage: e.currentTarget.result });
        };

        files.forEach((file, i) => {
            reader.readAsDataURL(file);
            _this.setState({ selectedImageName: file.name });
            images = [...images, file];
        });

        this.setState({ images });
    }

    renderDeleteCategoryModal = () => {
        const { checked, expanded, showSelectCategoryModal } = this.state;
        const { category: { categories } } = this.props;
        return (
            <Modal
                modalTitle="Seleccionar Categoria"
                show={showSelectCategoryModal}
                handleClose={() => this.setState({ showSelectCategoryModal: false })}
                buttons={[
                    {
                        label: 'OK',
                        color: 'success',
                        onClick: () => {
                            this.setState({ showSelectCategoryModal: false })
                        }
                    }
                ]}
            >
                <CheckboxTree
                    nodes={renderCategories(categories)}
                    checked={checked}
                    expanded={expanded}
                    onCheck={checked => this.setState({ checked })}
                    onExpand={expanded => this.setState({ expanded })}
                    icons={{
                        check: <i className={`fa fa-check-square`}></i>,
                        uncheck: <i className={`far fa-square`}></i>,
                        halfCheck: <i className={`fal fa-check-square`}></i>,
                        expandClose: <i className={`fas fa-caret-down`}></i>,
                        expandOpen: <i className={`fas fa-caret-up`}></i>,
                    }}
                />
            </Modal>
        );
    }

    render() {
        let { tags, selectedImage, checked, showSelectCategoryModal, selectedImageName } = this.state;
        const { category: { categories } } = this.props;

        let selectedCategory = "";

        if (checked && checked.length) {
            categories.find(element => selectedCategory = getCheckedCategory(element, "_id", checked[0]));
        }

        return (
            <Fragment>
                <header className="main-header">
                    <TopBanner text={'Subir un Producto'} />
                </header>
                <hr />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 my-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 imgUp">
                                        <div className="imagePreview">
                                            <div className="imagePreviewContent">
                                                <img src={selectedImage} alt="Product Image" />
                                            </div>
                                        </div>
                                        <label className="btn btn-primary">{(selectedImageName && selectedImageName.length) ? selectedImageName : 'Seleccionar Imagen del Producto'}
                                            <input type="file" accept="image/*" onChange={this.handleFileSelect} className="uploadFile img custom-file-input" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 m-auto">
                            <Formik
                                initialValues={{
                                    title: "",
                                    price: ""
                                }}
                                encType="multipart/form-data"
                                onSubmit={this.onSubmit}
                                validationSchema={ProductSchema}
                            >
                                {props => {
                                    const {
                                        values,
                                        errors,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit
                                    } = props;

                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <fieldset className="mt-4">
                                                <Field
                                                    name="title"
                                                    type="string"
                                                    id="title"
                                                    label="Tutulo del Producto"
                                                    placeholder="eg: Playera Adidas"
                                                    value={values.title}
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    component={CustomInput}
                                                />
                                                {errors.title &&
                                                    <Alert variant="danger" className="btn-block text-left">
                                                        <ErrorMessage name="title" />
                                                    </Alert>
                                                }
                                            </fieldset>
                                            <fieldset className="mb-4">
                                                <Field
                                                    name="price"
                                                    type="string"
                                                    id="price"
                                                    label="Precio del Producto"
                                                    placeholder="Precio"
                                                    value={values.price}
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    component={CustomInput}
                                                />
                                                {errors.price &&
                                                    <Alert variant="danger" className="btn-block text-left">
                                                        <ErrorMessage name="price" />
                                                    </Alert>
                                                }
                                            </fieldset>
                                            <fieldset className="mb-4">
                                                <p>Agreaga un Tag</p>
                                                <TagsInput
                                                    inputProps={{ className: 'react-tagsinput-input ', placeholder: '#Tag1, #Tag2, #Tag3' }}
                                                    value={tags}
                                                    onChange={this.handleTagsChange}
                                                    onlyUnique
                                                />
                                            </fieldset>
                                            <Button className="btn-block my-5" variant="info" onClick={() => this.setState({ showSelectCategoryModal: true })}>
                                                <i className={`fa fa-plus-square`}></i>&nbsp;
                                                {(selectedCategory && !showSelectCategoryModal) ? `Categoria Seleccionada: ${selectedCategory.name}` : "Añadir Categoria"}
                                            </Button>
                                            {this.renderDeleteCategoryModal()}
                                            <fieldset className="my-5">
                                                <input type="submit" value="Guardar" className="btn btn-outline-dark btn-block" />
                                            </fieldset>
                                        </form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                </div >
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.prods.errorMessage,
        auth: state.auth,
        category: state.category
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'ProductUpload' })
)(ProductUpload)