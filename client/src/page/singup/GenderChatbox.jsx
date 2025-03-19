import React from "react";

const GenderChatbox = ({onCheckboxChange,selectedGender}) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Male</span>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={
              selectedGender === "male"
            }
            onChange={() => onCheckboxChange("male")}
            required
            className="form-checkbox border-slate-900"
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Female</span>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={
              selectedGender === "female"
            }
            onChange={() => onCheckboxChange("female")}
            required
            className="form-checkbox border-slate-900"
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Other</span>
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            checked={
              selectedGender === "other"
            }
            onChange={() => onCheckboxChange("other")}
            required
            className="form-checkbox border-slate-900"
          />
        </label>
      </div>
    </div>
  );
};

export default GenderChatbox;
