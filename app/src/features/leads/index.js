import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteLead, getLeadsContent } from "./leadSlice";
import { Tooltip } from "flowbite-react";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Add New Lead",
        bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewLeadModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Leads() {
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeadsContent());
  }, []);

  const getDummyStatus = (index) => {
    if (index % 5 === 0) return <div className="badge">Not Interested</div>;
    else if (index % 5 === 1)
      return <div className="badge badge-primary">In Progress</div>;
    else if (index % 5 === 2)
      return <div className="badge badge-secondary">Sold</div>;
    else if (index % 5 === 3)
      return <div className="badge badge-accent">Need Followup</div>;
    else return <div className="badge badge-ghost">Open</div>;
  };

  const deleteCurrentLead = (index, user) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this lead?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
          index: { index, user },
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current Leads"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Company Name</th>
                <th>Activity</th>
                <th>Address</th>
                <th>Capital</th>
                <th>Legal Form</th>
                <th>Creation Delay</th>
                <th>Manager Full Name</th>
                <th>Manager Gender</th>
                <th>Manager Email</th>
                <th>Manager Phone</th>
                <th>Accountant</th>
                <th>Non Partner Manager</th>
                <th className="px-20 text-center">Needs</th>
                <th>Created At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && (
                <tr className="flex justify-center w-full">
                  <td>
                    <p className="text-center">List is Empty</p>
                  </td>
                </tr>
              )}
              {leads.map((lead, index) => {
                console.log(lead);
                return (
                  <tr key={index} className="">
                    <td className="text-center">{lead.id}</td>
                    <td className="text-center">{lead.companyName ? lead.companyName : "none"}</td>
                    <td className="text-center">{lead.activity ? lead.activity : "none"}</td>
                    <td className="text-center">{lead.address ? lead.address : "none"}</td>
                    <td className="text-center">{lead.capital ? lead.capital : "none"}</td>
                    <td className="text-center">{lead.legalForm ? lead.legalForm : "none"}</td>
                    <td className="text-center">{lead.creationDelay ? lead.creationDelay : "none"}</td>
                    <td className="text-center">
                      {lead.managerFullName ? lead.managerFullName : "none"}
                    </td>
                    <td className="text-center">{lead.managerGender ? lead.managerGender : "none"}</td>
                    <td className="text-center">{lead.managerEmail ? lead.managerEmail : "none"}</td>
                    <td className="text-center">{lead.managerPhone ? lead.managerPhone : "none"}</td>
                    <td className="text-center">{lead.accountant ? lead.accountant : "none"}</td>
                    <td className="text-center">
                      {lead.nonPartnerManager ? lead.nonPartnerManager : "none"}
                    </td>
                    <Tooltip content={lead.needs ? lead.needs : "none"}>
                      <td className="text-center">
                        {lead.needs.substr(0, 10)}...
                        <span className="text-blue-500 font-bold text-[10px]">
                          (Hover To see More)
                        </span>
                      </td>
                    </Tooltip>
                    <td>{lead.createdAt}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentLead(index, lead)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Leads;
