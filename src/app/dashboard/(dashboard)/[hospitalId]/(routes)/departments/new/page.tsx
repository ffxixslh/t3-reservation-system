import { DepartmentForm } from "../[departmentId]/components/department-form";

const DepartmentNewPage = async () => {
  await Promise.resolve();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DepartmentForm initialData={null} />
      </div>
    </div>
  );
};

export default DepartmentNewPage;
