import React, { Component, Fragment } from "react";
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as actions from '../../actions';
import TagsInput from 'react-tagsinput';
import Alert from 'react-bootstrap/Alert';

import "./ProductsUpload.css";
import CustomInput from '../CustomInput/CustomInput';
import TopBanner from '../TopBanner/TopBanner';

const ProductSchema = Yup.object().shape({
    title: Yup.string().required("Debes asignar Titulo del Producto"),
    price: Yup.string().required("Debes asignar Precio del Producto"),
    type: Yup.string().required("Debes asignar Tipo de Producto"),
    category: Yup.string().required("Debes asignar una Categoria"),
});

class ProductsUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            images: []
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    async onSubmit(data) {
        const { tags, images } = this.state;

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

    handleTagsChange(tags) {
        this.setState({ tags });
    }

    handleFileSelect(e) {
        e.preventDefault();
        let { images } = this.state;

        const files = Array.from(e.target.files);

        if (images && images.length) {
            files.forEach((file, i) => {
                images = [...images, file];
            });
            return this.setState({ images });
        }

        files.forEach((file, i) => {
            images = [...images, file];
        });

        this.setState({ images });
    }

    render() {
        let { tags, images } = this.state;

        return (
            <Fragment>
                <header className="main-header">
                    <TopBanner text={'Subir un Producto'} />
                </header>
                <hr />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <Formik
                                initialValues={{
                                    title: "",
                                    price: "",
                                    type: "",
                                    category: ""
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
                                            <fieldset>
                                                <Field
                                                    name="title"
                                                    type="string"
                                                    id="title"
                                                    label="Enter title"
                                                    placeholder="Titulo"
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
                                            <fieldset>
                                                <Field
                                                    name="price"
                                                    type="string"
                                                    id="price"
                                                    label="Enter price"
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
                                            <fieldset>
                                                <Field
                                                    name="type"
                                                    type="string"
                                                    id="type"
                                                    label="Enter type"
                                                    placeholder="Tipo de Producto"
                                                    value={values.type}
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    component={CustomInput}
                                                />
                                                {errors.type &&
                                                    <Alert variant="danger" className="btn-block text-left">
                                                        <ErrorMessage name="type" />
                                                    </Alert>
                                                }
                                            </fieldset>
                                            <fieldset className="mb-4 mt-3">
                                                <select
                                                    type="text"
                                                    role="multiselect"
                                                    name="category"
                                                    id="category"
                                                    value={values.color}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="form-control multiselect multiselect-icon"
                                                    style={{ display: 'block' }}
                                                >
                                                    <option value="" label="Selecciona una Categoria" />
                                                    <option value="medicinal" label="Medicinal" />
                                                    <option value="mexicana" label="Mexicana" />
                                                    <option value="vapes" label="Vapes" />
                                                    <option value="edibles" label="Comestibles" />
                                                </select>
                                                {errors.category &&
                                                    <Alert variant="danger" className="btn-block text-left mt-3">
                                                        <ErrorMessage name="category" />
                                                    </Alert>
                                                }
                                            </fieldset>
                                            <fieldset className="my-4">
                                                <div className="custom-file">
                                                    <input type="file" accept="image/*" multiple onChange={this.handleFileSelect} className="custom-file-input" />
                                                    <label className="custom-file-label">Seleciona tus Fotos</label>
                                                    {(images && images.length) ?
                                                        <Fragment>
                                                            <div>{images.length} Selected</div>
                                                            {images.map(({ name }, key) => {
                                                                return (
                                                                    <div key={key}>{name}</div>
                                                                )
                                                            })}
                                                        </Fragment>
                                                        :
                                                        null
                                                    }
                                                </div>
                                            </fieldset>
                                            <fieldset className="my-4">
                                                <TagsInput
                                                    inputProps={{ className: 'react-tagsinput-input ', placeholder: 'Agreaga un Tag' }}
                                                    value={tags}
                                                    onChange={this.handleTagsChange}
                                                    onlyUnique
                                                />
                                            </fieldset>
                                            <fieldset className="my-4">
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
        auth: state.auth
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'ProductsUpload' })
)(ProductsUpload)