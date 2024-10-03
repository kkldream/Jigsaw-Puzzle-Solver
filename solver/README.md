整體環境測試：
```
docker build -t solver -f Dockerfile-Test .

docker run -it --rm solver
```

僅輸出執行檔：
```
docker build -t exec -f Dockerfile-Exec .

docker run -it --rm -v "C:\GitHub\Jigsaw-Puzzle-Solver\solver\dist":/app/dist exec
```
