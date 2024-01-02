import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import { getCookie } from "./utils"; // Import the utility function

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewActive: false,
      pageList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        active: false,
      },
    };
  }

  componentDidMount() {
    this.setAxiosDefaults();
    this.refreshList();
  }

  setAxiosDefaults = () => {
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.headers.post['X-CSRFToken'] = getCookie('csrftoken');
    axios.defaults.headers.put['X-CSRFToken'] = getCookie('csrftoken');
    axios.defaults.headers.delete['X-CSRFToken'] = getCookie('csrftoken');
  }

  refreshList = () => {
    axios
      .get("/api/pages/")
      .then((res) => this.setState({ pageList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/pages/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/pages/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/pages/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", active: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayActive = (status) => {
    if (status) {
      return this.setState({ viewActive: true });
    }

    return this.setState({ viewActive: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displayActive(true)}
          className={this.state.viewActive ? "nav-link active" : "nav-link"}
        >
          Active
        </span>
        <span
          onClick={() => this.displayActive(false)}
          className={this.state.viewActive ? "nav-link" : "nav-link active"}
        >
          Inactive
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewActive } = this.state;
    const newItems = this.state.pageList.filter(
      (item) => item.active === viewActive
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`page-title mr-2 ${
            this.state.viewActive ? "active-page" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Revooz.com</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add page
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;