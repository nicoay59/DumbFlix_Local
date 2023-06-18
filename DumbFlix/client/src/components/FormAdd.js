
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import { API } from '../config/api';




function Formadd() {


  const title = 'Add Film';
  document.title = 'DumbFlix |' + title;

  let navigate = useNavigate();

  const [categories, setCategory] = useState([]);
  const [preview, setPreview] = useState(null);
  // const [previews, setPreviews] = useState(null);
  const [form, setForm] = useState({
    category_id: '',
    title:'',
    year: '',
    desc: '',
    titleps: '',
    thumb: '',
    link:'',
  });


  const getCategory = async () => {
    try {
      const response = await API.get('/categories');
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
   console.log(categories);
  const handleChangeCountryId = (e) => {
    const id = e.target.value;
  };

  const handleChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files [0]);
      setPreview(url);
    }
  };

  


  const handleSubmit = useMutation(async (e) =>{
    try{
      e.preventDefault();

      const config = {
        Headers: {
          'content-type':'multipart/form-data',
        },
      };

      const formData = new FormData();
      formData.set('title', form.title);
      // formData.set('name', form.name);
      formData.set('year', form.year);
      formData.set('desc', form.desc);
      formData.set('titleps', form.titleps);
      formData.set('link', form.link);
      formData.set('image', form.image[0], form.image[0].name);
      // let country_id = form.country_id.map((countryId) => Number(countryId))
      // formData.set('country_id', JSON.stringify(country_id));
      formData.set('category_id', form.category_id);




      const response = await API.post('/film', formData, config);
      console.log("add film success : ", response);

      navigate('/listfilm');
    } catch (error) {
      console.log("add trip failed : ", error);
    }
  });

  useEffect(() => {
    getCategory();
  }, []);



  return (
    <div className="pt-5" title={title}>
    <div style={{textAlign:'start', color:"#f5f5f5"}}>
      <Container>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <p>
            Add Film
        </p>
     <div className="d-flex"> 
        <div className="w-75">
        <input
          class="form-control"
          type="text"
          placeholder="Title"
          aria-label="default input example"
          name="title"
          onChange={handleChange}
          style={{backgroundColor:"rgba(210, 210, 210, 0.25)",  color:"#f5f5f5"}}
        ></input>
        </div>
         <div class="input-group mb-3 w-25 ms-2" style={{backgroundColor:"rgba(210, 210, 210, 0.25)",  color:"#f5f5f5"}}>
              <input type="file" class="form-control" id="inputGroupFile02" hidden></input>
              <input type="file" class="form-control" id="upload" name="image"  onChange={handleChange} style={{backgroundColor:"rgba(210, 210, 210, 0.25)",  color:"#f5f5f5"}}></input>
        </div>
       </div>
                    {preview && (
                <div className="d-flex justify-content-center pb-3">
                  <img
                    src={preview}
                    style={{
                      Width: '100%',
                      maxHeight: '450px',
                      objectFit: 'cover',
                    }}
                    alt={preview}
                    />
                </div>
              )}

        <p>

        </p>
        <input
          class="form-control"
          type="text"
          placeholder="Year"
          aria-label="default input example"
          name="year"
          onChange={handleChange}
          style={{backgroundColor:"rgba(210, 210, 210, 0.25)",  color:"#f5f5f5"}}
        ></input>
        <p>

        </p>
        <select class="form-select" aria-label="Default select example" name="category_id" onChange={handleChange} style={{backgroundColor:"rgba(210, 210, 210, 0.25)",  color:"#f5f5f5"}}>
          <option selected disabled value="placeholder">Category</option>
          {/* <option>select country</option> */}
          {categories.map((item, index) => (
            <option value={item.id} key={index} style={{color:'black'}}>{item.name}</option>
            
            ))}

            </select>
        <div class="mb-3">
            <p>

            </p>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            placeholder="Description"
            rows="3"
            name="desc"
            onChange={handleChange}
            style={{backgroundColor:"rgba(210, 210, 210, 0.25)",  color:"#f5f5f5"}}
          ></textarea>
        </div>
        <p>

        </p>
        <div className="d-flex"> 
        <div className="w-75">
        <input
          class="form-control"
          type="text"
          placeholder="Title Eps"
          aria-label="default input example"
          name="titleps"
          onChange={handleChange}
          style={{backgroundColor:"rgba(210, 210, 210, 0.25)",  color:"#f5f5f5"}}
        ></input>
        </div>
         <div class="input-group mb-3 w-25 ms-2">
              <input type="file" class="form-control" id="inputGroupFile02" hidden></input>
              <input type="file" class="form-control" id="upload" name="image"  onChange={handleChange} style={{backgroundColor:"rgba(210, 210, 210, 0.25)",  color:"#f5f5f5"}}></input>
        </div>
     </div>
                    {preview && (
                <div className="d-flex justify-content-center pb-3">
                  <img
                    src={preview}
                    style={{
                      Width: '100%',
                      maxHeight: '450px',
                      objectFit: 'cover',
                    }}
                    alt={preview}
                    />
                </div>
              )}
        <p>

        </p>
        <input
          class="form-control"
          type="text"
          placeholder="Link"
          aria-label="default input example"
          name="link"
          onChange={handleChange}
          style={{backgroundColor:"rgba(210, 210, 210, 0.25)",  color:"#f5f5f5"}}
        ></input>
        <Container className="mb-3">
            <div className="d-flex justify-content-end mt-5">
                <button className="btn btn-danger text-white" type="submit">
                    Save
                </button>
            </div>
        </Container>
        </form>
      </Container>
    </div>
    </div>
  );
}

export default Formadd;
