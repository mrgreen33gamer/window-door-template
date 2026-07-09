@echo off
set "root=%~dp0"

echo Project Tree Structure > project_tree.txt
echo. >> project_tree.txt

for %%d in (public components libs src) do (
    echo %%d: >> project_tree.txt
    tree "%root%%%d" /f /a >> project_tree.txt
    echo. >> project_tree.txt
)

echo Tree structure saved to project_tree.txt