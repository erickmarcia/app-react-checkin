import React, { useState,useEffect} from 'react';
import { toast } from "react-toastify";
import { saveTime, getTimes , updateTimes } from  '../Firebase/api';
import { useParams  } from "react-router-dom";

const initialState = {
  name: "",
  idEmployees: "",
  description: "",
  date: "",
  startTime: "",
  endTime: "",
};

const AddTimeEntryForm = (props) => {
    const [timesList, setTimesList]  = useState(initialState);

    const params = useParams();

      const handleInputChange = ({
         target: { name, value } 
        }) =>
      setTimesList({ ...timesList, [name]: value });

        const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(params.id);
     if (!params.id) {
      await saveTime(timesList);
      window.confirm("Time Entry Saved");
      //this.closeModal();
      // toast("New Time Added", {
      //   type: "success",
      // });
    } else {
      await updateTimes(params.id, timesList);
      console.log(params.id);
      toast("Updated", {
        type: "success",
      });
    }

    // Clean Form
    setTimesList(initialState);
  };



  const getLinkById = async (id) => {
    try {
      const doc = await getTimes(id);
      setTimesList({ ...doc.data() });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getLinkById(params.id);
    }
  }, [params.id]);

 
  return (
    <React.Fragment>
<div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex justify-end p-2">
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>
            <form onSubmit={handleSubmit} class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8" action="#">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">Check-In</h3>
                <div >
                    <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Employer Number</label>    
                    <input type="number" name="idEmployees" id="idEmployees" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="999999" 
                    value={timesList.idEmployees} 
                     onChange={handleInputChange}
                    required />                
                    <label for="text" class="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
                    <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Name Example" value={timesList.name}  
                    onChange={handleInputChange}
                     />
                {/* </div>    */}
                  {/* <div class="relative"> */}
                   <label for="text" class="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date</label>
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg class="mb-10 ml-7 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                  </div>
                  <input datepicker datepicker-format="mm/dd/yyyy" type="date" name="date" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={timesList.date} 
                   onChange={handleInputChange} placeholder="Select date"/>
                </div>
                  {/* <Calendar/> */}
                 <div class="grid xl:grid-cols-2 xl:gap-6">
    <div class="relative z-0 mb-2 w-full group">
        <input type="text" name="startTime" id="startTime" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="08:00:00 AM" value={timesList.startTime}  
                    onChange={handleInputChange} required />
        <label for="floating_startTime" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">StartTime</label>
    </div>
    <div class="relative z-0 mb-2 w-full group">
        <input type="text" name="endTime" id="endTime" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="05:00:00 PM"  value={timesList.endTime}  onChange={handleInputChange}  required />
        <label for="floating_endTime"  class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">EndTime</label>
    </div>
                </div>
                 <div>
                   <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your Description</label>
                   <textarea id="description" name="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."
                   value={timesList.description} 
                    onChange={handleInputChange}
                    ></textarea>
                </div>

                <button  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={!timesList.idEmployees || !timesList.name}
                  >
                    {props.currentId === "" ? "Update" : "Save"}
                </button>       
            </form>
        </div>
    </div>
    
</div> 
    </React.Fragment>
  );
}

export default AddTimeEntryForm