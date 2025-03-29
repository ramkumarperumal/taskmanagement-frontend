import "./index.css";

interface Props {
  colSpan?: number;
}

export const NoRecords = ({ colSpan = 100 }: Props) => {
  return (
    <tr>
      <td className="norecord-td" colSpan={colSpan}>
        No Record Found
      </td>
    </tr>
  );
};
