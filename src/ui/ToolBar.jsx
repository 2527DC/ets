const ToolBar = ({
  className = "",
  onAddClick,
  addButtonLabel = "Add",
  addButtonIcon = null,
  leftContent = null,
  rightContent = null,
  ...props
}) => {
  return (
    <div
      className={`flex items-center justify-between flex-wrap gap-4 ${className}`}
      {...props}
    >
      {/* Left section */}
      <div className="flex items-center gap-2 flex-wrap">
        {leftContent}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 flex-wrap whitespace-nowrap">
        {rightContent}

        {onAddClick && (
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {addButtonIcon}
            {addButtonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default ToolBar;
