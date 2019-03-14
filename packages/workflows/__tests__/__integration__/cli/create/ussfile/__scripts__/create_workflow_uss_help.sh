#!/bin/bash
set -e

echo "================Z/OS WORKFLOWS CREATE USS-FILE HELP==============="
bright zos-workflows create workflow-from-uss-file --help
if [ $? -gt 0 ]
then
    exit $?
fi

echo "================Z/OS WORKFLOWS CREATE USS-FILE HELP RFJ==========="
bright zos-workflows create workflow-from-uss-file --help --rfj
exit $?