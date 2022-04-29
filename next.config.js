module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/inscription",
        destination: "http://141.95.153.155/inscription",
      },
      {
        source: "/1",
        destination: "http://141.95.153.155/1",
      },
      {
        source: "/coffre",
        destination: "http://141.95.153.155/coffre",
      },
      {
        source: "/inscription2",
        destination: "http://141.95.153.155:8000/inscription",
      },
      {
        source: "/couloir",
        destination: "http://141.95.153.155:8000/couloir/1",
      },
      {
        source: "/vieux",
        destination: "http://141.95.153.155:8000/vieux",
      },
      {
        source: "/tresor",
        destination: "http://141.95.153.155/tresor",
      },
      {
        source: "/dragon",
        destination: "http://141.95.153.155:7259/dragon",
      },
    ];
  };
  return {
    rewrites,
  };
};
